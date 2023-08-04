import './myStyles.css'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroup from './CreateGroup'

const MainContainer = () => {
  return (
    <div className='mainContainer'>
        <Sidebar />
        <ChatArea />
        {/* <Welcome /> */}
        {/* <CreateGroup /> */}
    </div>
  )
}

export default MainContainer
