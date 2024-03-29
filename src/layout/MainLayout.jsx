import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Logo from "assets/images/logo.png";

const nav = [
  { url: "/", text: "Home" },
  { url: "/categorie", text: "Categorie" },
  { url: "/ricette", text: "Ricette" },
  { url: "/documentazione", text: "Documentazione" },
];

function MainLayout(props) {
  return (
    <>
      <Header logo={Logo} navItems={nav} />
      <main>{props.children}</main>
      <Footer
        courseName="Tecnologie e Applicazioni dei Sistemi Distribuiti"
        courseLink="https://elearning.unimib.it/course/view.php?id=31277"
        navItems={nav}
      />
    </>
  );
}

export default MainLayout;
