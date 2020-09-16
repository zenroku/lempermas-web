export const checkUserPost = (post, usr) => {
    const filter = post && post.filter(elm => elm.uploader === usr.uid)
    return filter
}

export const checkUserRegistered = (usr, usrs) => {
    const filter = usrs && usrs.find(elm => elm.userId === usr.uid)
    return filter
}