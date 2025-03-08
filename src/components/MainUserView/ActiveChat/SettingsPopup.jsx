

function SettingsPopup(props) {

    return(
        <div>
            {'hello'}
            <button onClick={()=>props.setSettingsOpen(false)}>return</button>
        </div>
    )
}

export default SettingsPopup