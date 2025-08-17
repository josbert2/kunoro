import React, { useState } from 'react';
import ScrollFillTextAdvanced from '../ScrollFillTextAdvanced';
import CustomButton from '../CustomButton';
import AnimatedContactHero from '../AnimatedContactHero';
import { sendContactEmail } from '../../api/contact';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
        service: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus({
                type: 'error',
                message: 'Por favor, completa todos los campos requeridos.'
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const result = await sendContactEmail(formData);
            
            if (result.success) {
                setSubmitStatus({
                    type: 'success',
                    message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
                });
                
                // Limpiar formulario
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    message: '',
                    service: ''
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <AnimatedContactHero />
            <section className="contact-section">
                <div className="bg-[#131514] z-[100] relative contact-container" style={{
                    backgroundImage: "url(https://html.ravextheme.com/redox/light/assets/imgs/digital-agency-modern/hero-3-bg-shape.webp)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    {/* Header Section */}
                    <div className="text-white text-xl font-bold relative text-center pt-20 pb-20 flex items-center justify-center">
                        <div className="absolute left-40 top-20">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="54" height="66" fill="#ffffff">
                                <path d="M0 0 C2.3732489 2.3732489 2.31898786 3.25714676 2.75 6.5 C4.06184134 13.58189346 7.44620438 19.98703714 12.8125 24.875 C16.09245512 27.06163675 19.30717507 28.62726449 22.94921875 30.10546875 C25 31 25 31 28 33 C27.3709375 33.21914063 26.741875 33.43828125 26.09375 33.6640625 C16.70702998 37.14167263 10.22944365 41.24104744 5.25390625 50.12109375 C3.03430826 55.21718011 1.9742836 60.54743041 1 66 C0.67 66 0.34 66 0 66 C-0.14695312 65.09378906 -0.29390625 64.18757813 -0.4453125 63.25390625 C-2.45514093 52.33845876 -5.55241833 44.72883331 -14.83203125 38.28515625 C-18.40504238 36.167101 -22.13939222 34.51922065 -26 33 C-23.42036472 31.28024315 -21.05405945 30.08825997 -18.25 28.8125 C-10.70136984 25.03818492 -5.93690921 20.28688774 -2.77734375 12.421875 C-1.47089429 8.35152994 -0.6691099 4.2171532 0 0 Z " fill="#fff" transform="translate(26,0)"/>
                            </svg>
                        </div>
                        <span className="ml-5 text-4xl font-bold leading-[1.2] syne-font">Contacto</span>
                        <div className="absolute right-40 top-40">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="63" height="67" fill="#ffffff">
                                <path d="M0 0 C12.68041759 -1.47446716 24.44008684 7.24084731 34.1875 14.3125 C47.34543311 26.88563609 55.5814563 42.98726411 58 61 C55.525 61.495 55.525 61.495 53 62 C52.82460693 61.42668945 52.64921387 60.85337891 52.46850586 60.26269531 C46.43426389 40.77015857 39.34325574 23.42218106 20.87109375 12.49609375 C14.15481749 8.99631986 7.18970902 6.34700989 0 4 C0 2.68 0 1.36 0 0 Z " fill="#fff" transform="translate(5,0)"/>
                                <path d="M0 0 C10.82282835 0.18660049 21.48913041 5.60562404 29.265625 13.06640625 C37.94987588 22.74817244 45.5312837 35.71790745 45 49 C43.11328125 48.859375 43.11328125 48.859375 41 48 C39.98046875 45.515625 39.98046875 45.515625 39.1875 42.25 C35.2433362 28.30783959 28.35936881 16.94327047 15.5625 9.6875 C10.50771737 7.12441107 5.31546091 4.96014828 0 3 C0 2.01 0 1.02 0 0 Z " fill="#fff" transform="translate(0,18)"/>
                            </svg>
                        </div>
                    </div>

                    {/* Animated Text */}
                    <ScrollFillTextAdvanced 
                        lines={[
                            "Estamos aquí para ayudarte",
                            "a crear algo increíble", 
                            "y traer tu visión a vida."
                        ]}
                        fillColor="#ffffff"
                        strokeColor="#666666"
                        fontSize="clamp(2.5rem, 8vw, 8rem)"
                        blurAmount={12}
                        animationDuration={1.0}
                    />

                    {/* Contact Content */}
                    <div className="contact-content">
                        <div className="contact-grid">
                            {/* Contact Information */}
                            <div className="contact-info syne-font">
                                <h3 className="contact-info-title">Información de Contacto</h3>
                                
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 16.42V19.956C21.0001 20.2092 20.9042 20.453 20.7316 20.6382C20.559 20.8234 20.3226 20.9347 20.07 20.95C19.633 20.984 19.276 21 19 21C10.163 21 3 13.837 3 5C3 4.724 3.015 4.367 3.05 3.93C3.06526 3.67744 3.17657 3.44101 3.3618 3.26841C3.54703 3.09581 3.79082 2.99989 4.044 3H7.58C7.70967 2.99998 7.83594 3.03998 7.94338 3.11384C8.05082 3.18769 8.13421 3.29195 8.184 3.413L9.359 6.274C9.4069 6.39015 9.41434 6.51698 9.38335 6.63803C9.35237 6.75907 9.28398 6.86834 9.188 6.953L7.359 8.518C8.36359 10.6404 10.3596 12.6364 12.482 13.641L14.047 11.812C14.1317 11.716 14.2409 11.6476 14.362 11.6166C14.4831 11.5857 14.6099 11.5931 14.726 11.641L17.587 12.816C17.7081 12.8658 17.8123 12.9492 17.8862 13.0566C17.96 13.1641 18 13.2903 18 13.42V16.42H21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Teléfono</h4>
                                        <p>+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>hello@kunoro.com</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Ubicación</h4>
                                        <p>123 Creative Street<br/>Design City, DC 12345</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Horarios</h4>
                                        <p>Lun - Vie: 9:00 AM - 6:00 PM<br/>Sáb: 10:00 AM - 4:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="contact-form-container">
                                <form className="contact-form syne-font" onSubmit={handleSubmit}>
                                    <h3 className="form-title">Envíanos un mensaje</h3>
                                    
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Nombre *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Tu nombre completo"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="tu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="company">Empresa</label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                placeholder="Nombre de tu empresa"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="service">Servicio de interés</label>
                                            <select
                                                id="service"
                                                name="service"
                                                value={formData.service}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Selecciona un servicio</option>
                                                <option value="ui-ux">UI/UX Design</option>
                                                <option value="web-design">Web Design</option>
                                                <option value="branding">Branding</option>
                                                <option value="webflow">Webflow</option>
                                                <option value="development">Development</option>
                                                <option value="consulting">Consulting</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label htmlFor="message">Mensaje *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows="6"
                                            placeholder="Cuéntanos sobre tu proyecto..."
                                        ></textarea>
                                    </div>

                                    {/* Status Message */}
                                    {submitStatus.message && (
                                        <div className={`form-status ${submitStatus.type}`}>
                                            {submitStatus.message}
                                        </div>
                                    )}

                                    <CustomButton 
                                        type="submit" 
                                        className="submit-button mt-10"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                                    </CustomButton>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="pb-32"></div>
                </div>
            </section>
        </>
    );
}
