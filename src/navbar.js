import { Navbar } from 'react-bootstrap';
import logo from "./div-logo.png"

const Navigation = () => {
return(
    <>
            <Navbar bg="dark" variant="dark" className="navbar navbar-default mb-5 ps-4 pe-4 pt-0 mt-0">
<div className="container-fluid">
    <div>
    <div className="navbar-brand"><img width="160"
      height="auto" className="logo d-inline-block align-top" src={logo} alt="Arya's Logo" /></div>
    </div>
    <div className="d-flex justify-content-between">
<span className="d-inline-block">IRS Errors Template</span>
    </div>
    </div>
</Navbar>
</>
)
}
export default Navigation