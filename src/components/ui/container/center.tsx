interface CenterProps {
    children: JSX.Element| React.ReactNode | string;
}

function Center(props : CenterProps){
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
           {props.children}
        </div>
    )
}

export default Center;
