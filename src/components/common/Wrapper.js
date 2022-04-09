export const Wrapper = (props) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        margin: '200px auto',
        maxWidth: '750px',
    }}>
        {props.children}
    </div >
);
