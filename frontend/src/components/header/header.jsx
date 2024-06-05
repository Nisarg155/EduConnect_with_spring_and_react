import Navbar from './navbar';
import {useState} from "react";
const Header = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <header>
      <Navbar />
    </header>
  );
}

export default Header;
