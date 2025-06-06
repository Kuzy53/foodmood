import React from 'react';
import s from './SecurityTab.module.scss';

const SecurityTab: React.FC = () => {

    return (
        <div className={s.securityTab}>

            <button className={s.deleteAccountButton}>Delete account</button>

        </div>
    );
};

export default SecurityTab; 