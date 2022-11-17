import Popup from './Popup';

export default function PlaylistPopup({ isOpen, closeCallBack }){
  return <Popup isOpen={isOpen} closeCallback={closeCallBack}>
    Hi this is the playlistpopup
  </Popup>
}