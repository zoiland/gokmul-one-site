import { useMemo, useState } from 'react'
import Seo from '../components/Seo'
import { useLocalePath } from '../i18n'
import './RiceGiBalancer.css'

const GRAINS = [
  { key: 'white', label: '백미', gi: 73, fiber: 1, color: '#E8DFC9' },
  { key: 'brown', label: '현미', gi: 54, fiber: 2.8, color: '#A77B4F' },
  { key: 'oat', label: '귀리', gi: 30, fiber: 6, color: '#88A05D' },
  { key: 'bean', label: '콩류', gi: 32, fiber: 7, color: '#455D43' },
  { key: 'multigrain', label: '잡곡', gi: 48, fiber: 4.2, color: '#C9A052' },
  { key: 'product', label: '곡물톡톡', gi: 55, fiber: 5.8, color: '#D66853' },
]

const INITIAL_BLEND = {
  white: 70,
  brown: 20,
  oat: 10,
  bean: 0,
  multigrain: 0,
  product: 0,
}

const INITIAL_HOUSEHOLD = {
  people: 4,
  mealsPerWeek: 10,
  bowlsPerPerson: 1,
}

const PACK_GRAMS = 70
const COOKED_RICE_GRAMS = 210

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function normalizeBlend(blend) {
  const total = Object.values(blend).reduce((sum, value) => sum + Number(value || 0), 0)
  if (!total) return INITIAL_BLEND

  return Object.fromEntries(
    Object.entries(blend).map(([key, value]) => [key, (Number(value || 0) / total) * 100])
  )
}

function calculateGi(blend) {
  const normalized = normalizeBlend(blend)
  const weightedGi = GRAINS.reduce((sum, grain) => sum + normalized[grain.key] * grain.gi, 0) / 100
  const fiberScore = GRAINS.reduce((sum, grain) => sum + normalized[grain.key] * grain.fiber, 0) / 100
  const activeCount = GRAINS.filter(grain => normalized[grain.key] >= 5).length
  const wholeShare = normalized.brown + normalized.oat + normalized.bean + normalized.multigrain + normalized.product

  const fiberBonus = Math.max(0, (fiberScore - 1) * 1.5)
  const diversityBonus = Math.min(1.6, activeCount * 0.4)
  const wholeBonus = Math.min(3, wholeShare * 0.03)
  const oatBonus = normalized.oat >= 20 ? 1.2 : 0
  const productBonus = Math.min(1.4, normalized.product * 0.06)
  const modeledGi = weightedGi - fiberBonus - diversityBonus - wholeBonus - oatBonus - productBonus + 0.7

  return Math.round(clamp(modeledGi, 35, 85))
}

function rebalanceWithOats(blend) {
  const normalized = normalizeBlend(blend)
  const targetOat = Math.max(20, normalized.oat)
  const oatIncrease = targetOat - normalized.oat
  return {
    ...normalized,
    white: Math.max(0, normalized.white - oatIncrease),
    oat: targetOat,
  }
}

function rebalanceWithProduct(blend) {
  const oatBlend = rebalanceWithOats(blend)
  const productIncrease = Math.max(0, 10 - oatBlend.product)
  return {
    ...oatBlend,
    white: Math.max(0, oatBlend.white - productIncrease),
    product: Math.max(10, oatBlend.product),
  }
}

function roundBundle(packCount) {
  return Math.max(6, Math.ceil(packCount / 6) * 6)
}

function formatPercent(value) {
  return `${Math.round(value)}%`
}

function getRangeLabel(gi) {
  if (gi <= 54) return '낮은 편'
  if (gi <= 64) return '관리 권장'
  return '높은 편'
}

function ScenarioCard({ title, gi, blend, tone }) {
  return (
    <article className={`gi-scenario gi-scenario--${tone}`}>
      <span className="gi-scenario__label">{title}</span>
      <strong className="gi-scenario__score">{gi}</strong>
      <span className="gi-scenario__range">{getRangeLabel(gi)}</span>
      <div className="gi-mini-stack" aria-hidden="true">
        {GRAINS.map(grain => {
          const width = normalizeBlend(blend)[grain.key]
          if (width < 1) return null
          return <span key={grain.key} style={{ width: `${width}%`, background: grain.color }} />
        })}
      </div>
    </article>
  )
}

function BlendBar({ blend }) {
  const normalized = normalizeBlend(blend)

  return (
    <div className="blend-bar" aria-label="밥 비율 미리보기">
      {GRAINS.map(grain => {
        const width = normalized[grain.key]
        if (width < 1) return null
        return (
          <span
            key={grain.key}
            className="blend-bar__segment"
            style={{ width: `${width}%`, background: grain.color }}
            title={`${grain.label} ${formatPercent(width)}`}
          />
        )
      })}
    </div>
  )
}

export default function RiceGiBalancer() {
  const lp = useLocalePath()
  const [blend, setBlend] = useState(INITIAL_BLEND)
  const [household, setHousehold] = useState(INITIAL_HOUSEHOLD)

  const total = Object.values(blend).reduce((sum, value) => sum + Number(value || 0), 0)
  const normalizedBlend = useMemo(() => normalizeBlend(blend), [blend])
  const oatBlend = useMemo(() => rebalanceWithOats(blend), [blend])
  const productBlend = useMemo(() => rebalanceWithProduct(blend), [blend])

  const currentGi = useMemo(() => calculateGi(blend), [blend])
  const oatGi = useMemo(() => calculateGi(oatBlend), [oatBlend])
  const productGi = useMemo(() => calculateGi(productBlend), [productBlend])
  const giDrop = currentGi - productGi

  const subscription = useMemo(() => {
    const productShare = normalizeBlend(productBlend).product || 10
    const weeklyServings = household.people * household.mealsPerWeek * household.bowlsPerPerson
    const weeklyPacks = Math.ceil((weeklyServings * COOKED_RICE_GRAMS * (productShare / 100)) / PACK_GRAMS)
    const recommendedWeeks = weeklyPacks <= 8 ? 4 : 2
    const packs = roundBundle(weeklyPacks * recommendedWeeks)
    const daysCovered = Math.max(
      7,
      Math.round((packs * PACK_GRAMS) / ((weeklyServings / 7) * COOKED_RICE_GRAMS * (productShare / 100)))
    )

    return {
      weeklyServings,
      weeklyPacks,
      recommendedWeeks,
      packs,
      daysCovered,
      productShare,
    }
  }, [household, productBlend])

  const updateBlend = (key, value) => {
    setBlend(prev => ({ ...prev, [key]: clamp(Number(value), 0, 100) }))
  }

  const updateHousehold = (key, value) => {
    setHousehold(prev => ({ ...prev, [key]: clamp(Number(value), key === 'bowlsPerPerson' ? 0.5 : 1, 42) }))
  }

  return (
    <>
      <Seo
        title="우리집 밥상 GI 밸런서"
        path="/gi-balancer"
        description="백미, 현미, 귀리, 곡물톡톡 비율을 입력하고 우리집 밥상의 예상 혈당 부담 지표와 정기배송 권장량을 확인해보세요."
      />

      <section className="gi-hero">
        <div className="container gi-hero__grid">
          <div className="gi-hero__copy">
            <p className="label">GI Balance Prototype</p>
            <h1 className="gi-title">우리집 밥상 GI 밸런서</h1>
            <p className="gi-hero__desc">
              집에서 먹는 밥 비율을 입력하면 예상 혈당 부담 지표를 계산하고,
              귀리와 곡물톡톡을 더했을 때의 변화와 정기배송 권장량까지 보여줍니다.
            </p>
          </div>

          <div className="gi-hero__summary" aria-label="현재 계산 결과">
            <span>예상 지표</span>
            <strong>{currentGi}</strong>
            <p>곡물톡톡 루틴 적용 시 {productGi}, 약 {giDrop}p 개선</p>
          </div>
        </div>
      </section>

      <section className="gi-workspace section">
        <div className="container gi-workspace__grid">
          <div className="gi-panel gi-panel--controls">
            <div className="gi-panel__head">
              <div>
                <p className="label">Step 1</p>
                <h2>우리집 밥 비율</h2>
              </div>
              <button className="gi-text-button" onClick={() => setBlend(INITIAL_BLEND)}>기본값</button>
            </div>

            <BlendBar blend={blend} />

            <div className="gi-total">
              <span>입력 합계</span>
              <strong className={total === 100 ? 'is-balanced' : ''}>{total}%</strong>
              <p>합계가 100%가 아니어도 계산에는 자동 보정 비율을 사용합니다.</p>
            </div>

            <div className="blend-controls">
              {GRAINS.map(grain => (
                <label className="blend-control" key={grain.key}>
                  <span className="blend-control__top">
                    <span>
                      <i style={{ background: grain.color }} />
                      {grain.label}
                    </span>
                    <strong>{blend[grain.key]}%</strong>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={blend[grain.key]}
                    onChange={event => updateBlend(grain.key, event.target.value)}
                  />
                </label>
              ))}
            </div>

            <div className="gi-presets">
              <button onClick={() => setBlend(oatBlend)}>귀리 20%로 보기</button>
              <button onClick={() => setBlend(productBlend)}>곡물톡톡 10% 넣기</button>
            </div>
          </div>

          <div className="gi-results">
            <div className="gi-panel gi-panel--score">
              <div className="gi-score-main">
                <span>현재 예상 GI</span>
                <strong>{currentGi}</strong>
                <em>{getRangeLabel(currentGi)}</em>
              </div>
              <div className="gi-score-copy">
                <h2>백미 비중을 줄이고 식이섬유가 높은 곡물을 늘릴수록 지표가 내려가요.</h2>
                <p>
                  이 수치는 원재료별 평균값과 비율을 이용한 내부 시뮬레이션입니다.
                  조리법, 반찬, 개인 상태에 따라 실제 반응은 달라질 수 있습니다.
                </p>
              </div>
            </div>

            <div className="gi-scenarios">
              <ScenarioCard title="현재 밥상" gi={currentGi} blend={blend} tone="current" />
              <ScenarioCard title="귀리 20%" gi={oatGi} blend={oatBlend} tone="oat" />
              <ScenarioCard title="곡물톡톡 추가" gi={productGi} blend={productBlend} tone="product" />
            </div>

            <div className="gi-panel gi-panel--insight">
              <p className="label">Recommended Mix</p>
              <h2>추천 비율</h2>
              <div className="recommend-list">
                {GRAINS.filter(grain => normalizeBlend(productBlend)[grain.key] >= 1).map(grain => (
                  <div key={grain.key}>
                    <span>{grain.label}</span>
                    <strong>{formatPercent(normalizeBlend(productBlend)[grain.key])}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gi-subscription section">
        <div className="container gi-subscription__grid">
          <div className="gi-subscription__copy">
            <p className="label">Step 2</p>
            <h2>우리집 식사량에 맞춘 정기배송</h2>
            <p>
              가족 수와 집밥 횟수를 반영해 곡물톡톡을 몇 팩, 얼마 주기로 받으면 좋을지 계산합니다.
              남기지 않고 꾸준히 이어가는 루틴을 만드는 쪽에 초점을 맞췄어요.
            </p>
          </div>

          <div className="household-card">
            <label>
              가족 인원
              <input
                type="number"
                min="1"
                max="12"
                value={household.people}
                onChange={event => updateHousehold('people', event.target.value)}
              />
            </label>
            <label>
              주당 집밥 횟수
              <input
                type="number"
                min="1"
                max="42"
                value={household.mealsPerWeek}
                onChange={event => updateHousehold('mealsPerWeek', event.target.value)}
              />
            </label>
            <label>
              1인당 밥공기
              <input
                type="number"
                min="0.5"
                max="3"
                step="0.5"
                value={household.bowlsPerPerson}
                onChange={event => updateHousehold('bowlsPerPerson', event.target.value)}
              />
            </label>
          </div>

          <div className="subscription-result">
            <span className="subscription-result__eyebrow">추천 구독 플랜</span>
            <strong>{subscription.recommendedWeeks}주마다 {subscription.packs}팩</strong>
            <p>
              주 {subscription.weeklyServings}인분 기준, 곡물톡톡을 밥 비율의 약 {Math.round(subscription.productShare)}%로 섞는 루틴입니다.
              한 번 배송으로 약 {subscription.daysCovered}일 사용할 수 있어요.
            </p>
            <div className="subscription-result__actions">
              <a className="btn btn-primary" href={lp('/products')}>추천 제품 보기</a>
              <a className="btn btn-outline" href={lp('/contact')}>구독 문의하기</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
