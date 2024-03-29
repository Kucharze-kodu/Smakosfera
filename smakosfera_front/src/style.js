// Stałe ułatwiające pracę

export const styles = {
  background: "w-full h-full bg-fill bg-[url('./assets/background.jpg')]",

  boxWidth: "xl:max-w-[1280px] w-full",

  logo: "font-poppins font-bold xs:text-[30px] text-[24px] gradient",
  heading:
    "font-poppins text-dimWhite font-semibold xs:text-[5rem] text-[2.5rem] xs:leading-[100px] leading-[50px]",
  heading2:
    "font-poppins font-semibold xs:text-[3rem] text-[2rem] xs:leading-[100px] leading-[50px] ",
  heading3:
    "font-poppins text-dimWhite font-semibold xs:text-[1.5rem] text-[1.5rem] xs:leading-[60px] leading-[50px] w-full",
  heading4:
    "font-poppins font-semibold xs:text-[3rem] text-[2rem] xs:leading-[100px] leading-[50px] w-full",
  heading5:
    "font-poppins font-semibold xs:text-[2.25rem] text-[1.5rem] xs:leading-[100px] leading-[50px] w-full ",
  paragraph:
    "font-poppins font-normal text-[18px] leading-[30.8px]",
    // "font-poppins font-normal text-[18px] leading-[30.8px]",
  paragraph2:
    "font-poppins font-normal text-[12px] leading-[25.8px]",
  paragraph3:
    "font-poppins font-normal text-[18px] leading-[30.8px]",
  
  icons: "font-poppins text__gradient text-[68px]",
  socialIcons: "font-poppins text-dimWhite text-[32px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "md:mx-20 sm:mx-16 mx-8",
  marginXIcons: "sm:mx-5 sm:mb-5 mx-1 mb-1",
  marginY: "sm:my-16 my-6",
};

export const layout = {
  section: `flex md:flex-row flex-col`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};
