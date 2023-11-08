import React, { useState, type FC } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendEmail, type FormDataDto } from "src/services/mail-client";

interface FormComponentProps {
  keys: {
    RECAPTCHA_KEY: string;
    RECAPTCHA_SECRET_KEY: string;
  },
  API_BASE_URL: string;
}

const initialValues = {
  full_name: '',
  email: '',
  subject: '',
  message: '',
}

export const FormComponent:FC <FormComponentProps>= ({ keys, API_BASE_URL }) => {
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [data, setData] = useState(initialValues);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      data.full_name.length < 1 ||
      data.message.length < 1 ||
      data.subject.length < 1 || 
      data.email.length < 1
    ) {
      return alert('Todos los campos del formulario son obligatorios')
    }

    setShowCaptcha(true);
  }

  const handleChangeData = (input: any) => {
    setData({
      ...data,
      [input.target.name]: input.target.value
    });
  }

  const handleCompleteCaptcha = async () => {
    setIsLoading(true)
    setShowCaptcha(false)
    
    const formData: FormDataDto = {
      fullName: data.full_name,
      from: data.email,
      subject: data.subject,
      message: data.message,
    }

    sendEmail(formData, API_BASE_URL)
      .then(response => {
        setData(initialValues);
        setIsLoading(false)
        alert(response.message)
      })
      .catch(err => {
        setIsLoading(false)
        alert('Ha ocurrido un error, inténtelo mas tarde.')
        console.log(err)
      })
  }

  const FormButtonComponent = () => (
    <>
      {
        showCaptcha
        ? (<ReCAPTCHA sitekey={keys.RECAPTCHA_KEY} onChange={handleCompleteCaptcha}/>)
        : (
          <div className="my-3">
            <button type="submit" className="theme-btn form-control">
              Envíe su mensaje{" "}
              <i className="far fa-long-arrow-alt-right"></i>
            </button>
          </div>
        )
      }
    </>
  )

  return (
    <section className="contact_wrapper overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="contact_widget bg-center bg-cover">
              <div className="section-title text-center mb-30">
                <h6>
                  <img src="/assets/img/home_01/bage_head.svg" />
                  Contactenos
                </h6>
                <h2>Cont&aacute;ctenos para un turno</h2>
              </div>
              <form action="" role="form" onSubmit={handleSubmit}>
                <div className="row mt-30">
                  <div className="col-md-6">
                    <div className="my-3">
                      <input
                        onChange={handleChangeData}
                        value={data.full_name}
                        name="full_name"
                        type="text"
                        className="form-control"
                        placeholder="Nombre Completo"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="my-3">
                      <input
                        onChange={handleChangeData}
                        value={data.email}
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Dirección de mail"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="my-3">
                      <input
                        onChange={handleChangeData}
                        value={data.subject}
                        name="subject"        
                        type="text"
                        className="form-control"
                        placeholder="Asunto o consulta"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="my-3">
                      <textarea
                        onChange={handleChangeData}
                        value={data.message}
                        name="message"
                        className="form-control"
                        cols={8}
                        rows={4}
                        placeholder="Motivo de su consulta"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    {
                      isLoading 
                      ? (<div className="form-loader"/>)
                      : (<FormButtonComponent />)
                    }
                  </div>
                </div>
              </form>
              <div className="scal_element d-none d-xl-block">
                <img src="/assets/img/home_02/secol_01.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home_element d-none d-xl-block">
        <img src="/assets/img/home_02/home_01.svg" />
      </div>
    </section>
  );
};
