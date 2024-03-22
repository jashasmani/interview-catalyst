// import React from "react";
// import {
//   Box,
//   FooterContainer,
//   Row,
//   Column,
//   FooterLink,
//   Heading,
// } from "./FooterStyles";

// const Footer = () => {
//   return (
//     <Box>
//       <h1
//         style={{
//           color: "green",
//           textAlign: "center",
//           marginTop: "10px",
//         }}
//       >
//         {/* A Computer Science Portal for Geeks! */}
//       </h1>
//       <FooterContainer>
//         {/* <Row> */}
//         {/* <Heading>INTERVIEW CATALYST</Heading> */}
//           {/* <Column>
            
//             <FooterLink href="#">Questions</FooterLink>
//             <FooterLink href="#">Help</FooterLink>
//           </Column> */}
//           {/* <Column>
//             <Heading>Top Searches</Heading>
//             <FooterLink href="#">Writing</FooterLink>
//             <FooterLink href="#">Internships</FooterLink>
//             <FooterLink href="#">Coding</FooterLink>
//             <FooterLink href="#">Teaching</FooterLink>
//           </Column>
//           <Column>
//             <Heading>Contact Us</Heading>
//             <FooterLink href="#">Get Started</FooterLink>
//             <FooterLink href="#">About Us</FooterLink>
//             <FooterLink href="#">Services</FooterLink>
//             <FooterLink href="#">FAQ</FooterLink>
//           </Column> */}
//           {/* <Column>
//             <Heading>Social Media</Heading>
//             <FooterLink href="#">
//               <i className="fab fa-facebook-f">
//                 <span
//                   style={{
//                     marginLeft: "10px",
//                   }}
//                 >
//                   Facebook
//                 </span>
//               </i>
//             </FooterLink>
//             <FooterLink href="#">
//               <i className="fab fa-instagram">
//                 <span
//                   style={{
//                     marginLeft: "10px",
//                   }}
//                 >
//                   Instagram
//                 </span>
//               </i>
//             </FooterLink>
//             <FooterLink href="#">
//               <i className="fab fa-twitter">
//                 <span
//                   style={{
//                     marginLeft: "10px",
//                   }}
//                 >
//                   Twitter
//                 </span>
//               </i>
//             </FooterLink>
//             <FooterLink href="#">
//               <i className="fa fa-linkedin-in">
//                 <span
//                   style={{
//                     marginLeft: "10px",
//                   }}
//                 >
//                   LinkedIn
//                 </span>
//               </i>
//             </FooterLink>
//           </Column> */}
//         {/* </Row> */}
//         Interview catalyst
//       </FooterContainer>
//     </Box>
//   );
// };
// export default Footer;

// import React from "react";
// import "./Footer.css";
// import { FaInstagram, FaLinkedin, FaGoogle } from "react-icons/fa";
// // import "@fortawesome/fontawesome-free/css/all.min.css";

// const Footer = () => {
//   return (
//     <footer>
//       <div className="footer-content">
//         <h3>Interview Catalyst</h3>
//         <p>
//           Made with <span class="heart">&#10084;</span> by Rohit and Payal
//         </p>
//         <ul className="socials">
//           <li>
//             <a href="#">
//               <FaGoogle size={30} color="#DB4437" />
//             </a>
//           </li>
//           {/* <li>
//             <a href="#">
//               <FaInstagram size={30} color="#C13584" />
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <FaInstagram size={30} color="#C13584" />
//             </a>
//           </li> */}
//           <li>
//             <a href="#">
//               <FaInstagram size={30} color="#C13584" />
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <FaLinkedin size={30} color="#0077B5" />
//             </a>
//           </li>
//         </ul>
//       </div>
//       <div className="footer-bottom">
//         <p>
//           copyright &copy; <a href="#">Interview Catalyst,2024</a>{" "}
//         </p>
//         <div className="footer-menu">
//           <ul className="f-menu">
//             <li>
//               <a href="">Home</a>
//             </li>
//             <li>
//               <a href="">About</a>
//             </li>
//             <li>
//               <a href="">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Footer.css";
import { FaInstagram, FaLinkedin, FaGoogle } from "react-icons/fa";



const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h1 className="tag">Interview Catalyst</h1>
        <p>
          Made  <span></span> 
           {/* <span className="heart">&#10084;</span>  */}
           by Dhairya and Jash
        </p>
        <div className="footer-menu">
          <ul className="f-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <ul className="socials">
          <li>
            <Link to="#">
              <FaGoogle size={30} color="#DB4437" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <FaInstagram size={30} color="#DB4437" />
            </Link>
          </li>
          
          <li>
            <Link to="#">
              <FaLinkedin size={30} color="#0077B5" />
            </Link>
          </li>
        </ul>
        
      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy; <Link to="#">Interview Catalyst, 2024</Link>{" "}
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;





