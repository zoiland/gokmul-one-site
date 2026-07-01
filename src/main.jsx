import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'
import './index.css'

// vite-react-ssg 진입점: 각 라우트를 빌드 시 정적 HTML로 프리렌더한다.
export const createRoot = ViteReactSSG({ routes })
