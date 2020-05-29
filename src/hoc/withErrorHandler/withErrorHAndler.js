import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);

        const requestInterceptor = axios.interceptors.request.use(req => {
            setError(null)
            return req;
        })
        const responseInterceptor = axios.interceptors.response.use(resp => resp, err => {
            setError(err)
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, [requestInterceptor, responseInterceptor])

       const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {... props} />
            </Aux>
        );

    }
};

export default withErrorHandler;