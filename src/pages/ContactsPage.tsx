import React from 'react';

const ContactsPage = () => {
    return (
        <div>
            <h1 className="mt-6 text-center text-6xl font-bold tracking-tight text-gray-900">О нас</h1>
            <hr className="mx-32 mt-6"/>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mx-12">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d597.6652367348693!2d50.09100632926893!3d53.18806170232377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41661e17ca1d9aaf%3A0x4a5cf4cae3f0b8ba!2z0J_QvtC00LDRgNC60Lg!5e0!3m2!1sru!2sru!4v1587446296803!5m2!1sru!2sru"
                        className="embed-responsive-item" width="600" height="450" frameBorder="0"
                        aria-hidden="false" tabIndex={0}></iframe>
                </div>
                <div className="ml-12">
                    <dt className="text-center text-xl font-bold">Адрес:</dt>
                    <dd className="text-center text-xl font-bold">г.Самара , ул.Фрунзе, 94</dd>
                    <dt className="mt-5 text-center text-xl font-bold">Телефон:</dt>
                    <dd className="text-center text-xl font-bold">+7(846) 214‒03‒53</dd>
                    <dd className="text-center text-xl font-bold">+7(927) 269‒99‒53</dd>
                    <dd className="text-center text-xl font-bold">+7(927) 201‒50‒70</dd>
                    <dt className="mt-5 text-center text-xl font-bold">Электронная почта:</dt>
                    <dd className="text-center text-xl font-bold">adonis-samara@mail.ru</dd>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;