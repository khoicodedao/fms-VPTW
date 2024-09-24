import { RouterAll } from './routes/RouterAll'
import 'devextreme/dist/css/dx.light.css'
import { GlobalProvider } from './context/global.context'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalProvider>
          <RouterAll />
        </GlobalProvider>
      </BrowserRouter>
    </div>
  )
}
export default App
