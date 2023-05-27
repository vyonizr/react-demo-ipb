import PropTypes from 'prop-types'
import styles from './style.module.css'

function Button({ onClick, children, disabled = false, style: customStyle }) {
  const style = {
    ...customStyle,
    backgroundColor: disabled ? 'rgb(148 163 184)' : 'rgb(37 99 235)',
    cursor: disabled ? 'not-allowed' : 'pointer'
  }
  return (
    <button className={styles.button} style={style} onClick={onClick}>{children}</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool
}

export default Button