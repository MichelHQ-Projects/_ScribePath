import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "../../../Icon";
import Overview from "./Overview";
import Products from "./Products";

// const navigation = ["Product", "Comments"]; // Possibly useful in teams set up
const navigation = ["Product"];

const Details = ({ className, setValue, activeIndex, setActiveIndex }) => {
    const handleClick = (index) => {
        setActiveIndex(index);
        index === 0 && setValue(false);
        index === 1 && setValue(true);
    };

    return (
        <div className={cn(styles.details, className)}>
            <div className={styles.head}>
                <div className={styles.nav}>
                    {navigation.map((x, index) => (
                        <button
                            className={cn(styles.link, {
                                [styles.active]: index === activeIndex,
                            })}
                            onClick={() => handleClick(index)}
                            key={index}
                        >
                            {x}
                        </button>
                    ))}
                </div>
                <div className={styles.btns}>
                    <button className={cn("button-stroke-red")}>
                        <span className={styles.inner}>
                            <Icon name="trash" size="24" />
                        </span>
                    </button>
                </div>
            </div>
            <Overview />
            <Products />
        </div>
    );
};

export default Details;
