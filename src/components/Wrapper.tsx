import { ReactNode } from "react";

type WrapperProps = {
    children: ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {

    return (
        <div className="wrapper">
            {children}
        </div>
    )
}

export default Wrapper;