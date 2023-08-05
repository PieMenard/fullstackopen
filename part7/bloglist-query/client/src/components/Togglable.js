import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button 
                    variant="outline-primary" 
                    onClick={toggleVisibility}
                >
                    {props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility}
                    variant="outline-danger"
                    size="sm"
                >
                cancel
                </Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable