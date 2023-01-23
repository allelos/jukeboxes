import styles from "@styles/stationRequest.module.css";

const Completion = () => {
  return (
    <div className={styles.success}>
      <h2>Your request has been submitted successfully! 😊</h2>
      <div className={styles.content}>
        <p>
          We will review the request and if it aligns with our music style we
          will add it to our list of beloved stations. Thank you!
        </p>
        <p>Make sure you check back often</p>
      </div>
    </div>
  );
};

export default Completion;
