import {useState} from "react";
import { Icon, Nav, Navbar, Sidebar, Sidenav} from "rsuite"; // or 'rsuite/dist/styles/rsuite-default.css'
import { Link } from "react-router-dom";

export default function Menu(props) {
    const [expand, setExpand] = useState(true);

    const headerStyles = {
        padding: 18,
        fontSize: 16,
        height: 56,
        background: '#34c3ff',
        color: ' #fff',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    };

    const NavToggle = ({ expand, onChange }) => {
        return (
            <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav pullRight>
                <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                    <Icon icon={expand ? 'angle-left' : 'angle-right'} />
                </Nav.Item>
                </Nav>
            </Navbar.Body>
            </Navbar>
        );
    };

    const handleToggle = () => {
        setExpand(!expand);
    }

    return (
        <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
        >
            <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Header>
                <div style={headerStyles}>
                <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                <span style={{ marginLeft: 12 }}> BRAND</span>
                </div>
            </Sidenav.Header>
            <Sidenav.Body>
                <Nav>
                <Link to="/">
                    <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />} to="/">
                    Dashboard
                    </Nav.Item>
                </Link>
                <Link to="/companies">
                    <Nav.Item eventKey="2" icon={<Icon icon="explore" />}>
                    Companies
                    </Nav.Item>
                </Link>
                <Link to="/formulas">
                    <Nav.Item eventKey="3" icon={<Icon icon="arrow-down" />}>
                    Formulas
                    </Nav.Item>
                </Link>
                <Link to="/subscribers">
                    <Nav.Item eventKey="4" icon={<Icon icon="group" />}>
                    Subscribers
                    </Nav.Item>
                </Link>
                </Nav>
            </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={handleToggle} />
            </Sidebar>
    )
}