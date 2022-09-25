import "..//charPopup/charPopup.scss"

const Popup = ({ userClickedX, userClickedY, onTextClicked }) => {

    return(
        <div>
            <div className="popupBox" style={ {position: "absolute" ,
                  left: `${userClickedX}px` , top: `${userClickedY}px`} }>
              <p onClick={onTextClicked}>Waldo</p>
              <p onClick={onTextClicked}>Detective</p>
              <p onClick={onTextClicked}>Cowboy</p>
            </div>
        </div>
    )
};
export default Popup;