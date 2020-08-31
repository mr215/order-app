import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import useStores from 'hooks/useStores'
import Header from 'components/Header'

const PaymentSummary: React.FC<RouteComponentProps> = ({ history }) => {
    const { orderStore } = useStores()

    const handleClick = () => {
        console.log('happy friday')
    }
    return (
        <div>
            <Header />
            <div style={{
              textAlign: 'center',
              margin: '0.5rem',
            }}>
                <h2> Payment </h2>
            </div>

        </div>
    )
}

export default PaymentSummary