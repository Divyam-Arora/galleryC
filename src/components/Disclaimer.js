import Modal from "./UI/Modal";

const Disclaimer = function ({ action }) {
  const closeAction = () => {
    localStorage.setItem("disclaimer", "true");
    action();
  };
  return (
    <Modal action={closeAction}>
      <section style={{ width: "400px", maxWidth: "95vw" }}>
        <div className="modal-header">
          <h3 className="heading-tertiary">Disclaimer</h3>
        </div>
        <div className="flex-column margin-top-lg margin-bottom">
          <p style={{ lineHeight: "18px" }}>
            This application is a learning project and is currently being hosted
            on a free service with limited storage and bandwidth.
          </p>
          <p style={{ lineHeight: "18px" }}>
            For that reason, I request you to <strong>not abuse</strong> the
            platform. Only use it for testing and lite uploads.
          </p>
          <p style={{ lineHeight: "18px" }}>
            In case of any abuse, the application{" "}
            <strong>will be taken down</strong> and all you data will be lost.
            So, do not upload any sensitive or heavy media to the site.
          </p>
          <p style={{ lineHeight: "18px" }}>
            Nonetheless, feel free to look around and have fun with it. 😀
          </p>
        </div>
      </section>
    </Modal>
  );
};

export default Disclaimer;
