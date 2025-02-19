const Message = ({ message, type }) => {
  const messageStyle = {
    color: type === 'error' ? 'red' : 'green',
    fontStyle: 'italic',
    fontSize: 16,
    border: `1px solid ${type === 'error' ? 'red' : 'green'}`,
    padding: '5px',
    marginBottom: '10px'
  }
  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Message