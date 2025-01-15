import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, useParams } from "react-router-dom";
import styles from "../Styles/dashbord.module.css"
import { IoIosMenu } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { FaAnglesRight } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

{/* <FaAnglesRight /> */ }

const Dashbord = () => {


  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({})
  const location = useLocation();



  const pathParts = location.pathname.split('/')
  const currentPath = pathParts[pathParts.length - 1];
  const capitalPath = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);


  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prevState => !prevState);

    setOpen(!open);
  };

  useEffect(() => {

    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString)
    const data = urlParams.get('user')


    if (data) {
      const userObj = JSON.parse(data)
      setUser(userObj)
      console.log(user)
    }
  }, [location.search]);


  console.log(user)
  return (
    <section>
      {/* <div>
        <p>User</p>

        {
          user.fullName ? <h1>{user.fullName}</h1> : <p>No Name</p>
        }

        {

          user.profileImage ? <img src={user.profileImage.google} /> : <p>No Image</p>
        }

        {

          user.email ? <h3> {user.email}</h3> : <p>No Image</p>
        }
      </div> */}

      <div>
        <nav className={styles.header}>

          {open ? <  IoMdCloseCircleOutline onClick={toggleMenu} className={styles.logo} /> : <IoIosMenu onClick={toggleMenu} className={styles.logo} />}

          <p>{capitalPath}</p>


          <div className={styles.Btns}>
            <button className={styles.upgradeBtn} >Upgrade To Premium</button>
            <button className={styles.freeBtn} >Get Started's its free</button>

          </div>
          <Link to="/profile">
            <img className={styles.userimage} src="https://cdn-icons-png.flaticon.com/128/6997/6997662.png" />
          </Link>
        </nav>



      </div>


      <div className={styles.workspace}>
        <div className={styles.sideBarLogo} >




          <div className={styles.basicnotes}>

            <div >
              <Link to="notes">
                <img style={{ width: "30px" }} src="https://www.svgrepo.com/show/331588/standard-notes.svg" />
              </Link>
            </div>



            <div className={[styles.logodiv, styles.logodiv1].join(' ')}>
              <Link to="commingsoon">
                <img className={styles.logodivImage} src="https://assets.quillbot.com/images/theme/commonImages/paraphraser-new.svg" />
              </Link>
            </div>



            <div className={[styles.logodiv, styles.logodiv2].join(' ')}>
              <Link to="commingsoon">
                <img className={styles.logodivImage} src="https://assets.quillbot.com/images/theme/commonImages/grammar-checker-new.svg" />
              </Link>
            </div>


            <div className={[styles.logodiv, styles.logodiv3].join(' ')}>
              <Link to="commingsoon">
                <img className={styles.logodivImage} src="https://assets.quillbot.com/images/theme/light/aiDetector/ai-detector-old.svg" />
              </Link>
            </div>




            <div className={[styles.logodiv, styles.logodiv4].join(' ')}>
              <Link to="commingsoon">
                <img className={styles.logodivImage4} src="https://assets.quillbot.com/images/theme/commonImages/plag-checker-new.svg" />
              </Link>
            </div>


            <div className={[styles.logodiv, styles.logodiv5].join(' ')}>
              <Link to="commingsoon">
                <img className={styles.logodivImage} src="https://assets.quillbot.com/images/theme/commonImages/summarizer-new.svg" />
              </Link>
            </div>

            <div className={[styles.logodiv, styles.logodiv6].join(' ')}>
              <Link to="commingsoon">
                <img className={styles.logodivImage} src="https://assets.quillbot.com/images/theme/light/translator/translator_icon.svg" />
              </Link>
            </div>

            <div className={[styles.logodiv, styles.logodiv7].join(' ')}>
              <Link to="commingsoon">
                <img className={styles.logodivImage} src="https://assets.quillbot.com/images/theme/commonImages/citation-generator-logo.svg" />
              </Link>
            </div>





            <div className={styles.sevicesSupport}>
              <MdMailOutline />
              <MdHelpOutline />
            </div>



          </div>

          <div className={styles.menu} style={{ left: menuVisible ? '0px' : '-182px' }}>

            <div className={styles.menuOption}>
              <Link to="notes" >Notes</Link>
            </div>

            <div className={styles.menuOption}>
              <Link to="commingsoon" >Paraphraser</Link>
            </div>

            <div className={styles.menuOption}>
              <Link to="commingsoon" >Grammer Checker</Link>
            </div>

            <div className={styles.menuOption}>
              <Link to="commingsoon" >Al Dectector</Link>
            </div>

            <div className={styles.menuOption}>
              <Link to="one" >Plagiarism Checker</Link>
            </div>

            <div className={styles.menuOption}>
              <Link to="commingsoon" >Summarizer</Link>
            </div>

            <div className={styles.menuOption}>
              <Link to="commingsoon" >Tranlator</Link>
            </div>

            <div className={styles.menuOption}>
              <Link to="commingsoon" >Spell Checker</Link>
            </div>
            {/* <Link to="one" >Paragraph Checker</Link>
            <Link to="one" >Palagarism Checker</Link>
            <Link to="one" >AI Assistance</Link>
            <Link to="one" >Tranlater</Link> */}
          </div>
        </div>
        <div className={styles.workingArea} >
          <Outlet />
        </div>
        <div className={styles.rightBtns} ></div>

      </div>

    </section>
  )
}

export default Dashbord

