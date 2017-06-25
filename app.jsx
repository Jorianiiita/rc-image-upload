class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.propTypes = {
      multiple: Boolean,
      accept: String,
    }
    this.state = {
      files : []
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    console.log(e.target.files)
    this.setState({files: Array.prototype.slice.call(e.target.files)})
  }

  onSubmit(e) {
    e.preventDefault()
    let promises = this.state.files.map(function(file) {
      let formData = new FormData()
      formData.append('image_url', file)
      fetch('http://localhost:9090/imageUpload.php', {
        method: 'POST',
        body: formData
      }).then(function(res) {
        console.log(res)
      })
    })
    Promise.all(promises).then(function(res) {
      console.log(res)
    })
  }

  render() {
    let _this = this;
    return (
      <form onSubmit={_this.onSubmit} class="form-horizontal">
        <div class="preview"></div>
        <input style={{width: 400, height: 200, border: '1px solid #cacaca'}} onChange={_this.onChange} type="file" name="image" class="form-control"  multiple={_this.props.multiple} accept={_this.props.accept} />
        <br/>
        <button class="btn btn-success upload-image">Image Upload</button>
      </form>
    )
  }
}

ReactDOM.render(<ImageUpload multiple={true} accept="image/*" />, document.getElementById('app'))