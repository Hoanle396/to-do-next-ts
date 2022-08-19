import React, { ReactNode } from "react";
import styles from "./Layout.module.scss";
const BaseLayout = ({ children }: { children: ReactNode }) => {
   return <div className={styles.layout}>
      {children}
   </div>;
};

export default BaseLayout;
