import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import BotonVacio from "@/components/Form/ButtonCustom/BotonVacio";
import ModalCustom from "@/components/ModalCustom";
import { useState } from "react";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";

export default function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };

  const textBut = <FontAwesomeIcon size="lg" icon={faPlusCircle} />;
  return (
    <div className="account__addresses">
      <div className="card text-left">
        <div className="card-body">
          <div className="row">
            <div className="col-12 d-flex justify-content-between">
              <div>
                <h4>Direcciones de envío </h4>
              </div>
              <div className="text-end">
                <BotonVacio
                  type="text"
                  onClick={() => openModal("Nueva dirección")}
                  textButton={textBut}
                ></BotonVacio>
              </div>
            </div>
          </div>
          <div className="card-text mt-4">
            <AddressList
              reloadAddresses={reloadAddresses}
              setReloadAddresses={setReloadAddresses}
              openModal={openModal}
            />
          </div>
        </div>
      </div>
      <ModalCustom show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </ModalCustom>
    </div>
  );
}
