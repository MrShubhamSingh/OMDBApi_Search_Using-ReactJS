import React, { Component, Fragment } from 'react';
import './modal.css'
import Backdrop from '../Backdrop/Backdrop'


class modal extends Component {


    render() {

        return (
            <Fragment>
                <Backdrop show={this.props.propsToShow} hide={this.props.propsToHide} />
                <div className="Modal" style={{
                    transform: this.props.propsToShow ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.propsToShow ? 1 : 0
                }}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }

}
export default modal;