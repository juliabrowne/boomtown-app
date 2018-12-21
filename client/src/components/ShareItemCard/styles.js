const style = theme => ({
  card: {
    maxWidth: 450,
    width: 450,
    height: 550,
    margin: 30,
    wordWrap: 'break-word'
  },
  media: {
    height: 300
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'spaceBetween',
    marginBottom: 10
  },
  avatar: {
    height: 60,
    width: 60
  },
  borrowButton: {
    position: 'relative',
    top: 0
  },
  tagsGrid: {
    position: 'relative',
    top: 20,
    height: 50,
    width: 400
  },
  gravatar: {
    borderRadius: 50
  }
});

export default style;
