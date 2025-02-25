import React from 'react'

interface HeaderTitleProps {
    title: string;
    subTitle?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, subTitle }) => {
    return (
        <>
            <h1 style={{marginBottom: "1.25rem"}}>{title}</h1>
            <h4 style={{marginBottom: "1.25rem"}}>{subTitle}</h4>
        </>
    )
}

export default HeaderTitle