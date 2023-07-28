import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Can't find this page</p>
            <Link style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px' }} to='/'>Back to home page</Link>
        </>
    )
}

export default Page404