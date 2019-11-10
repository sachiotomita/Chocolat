export let timerDebounce = undefined

export function debounce(duration, callback) {
    clearTimeout(timerDebounce)
    timerDebounce = setTimeout(function() {
        callback()
    }, duration)

    return timerDebounce
}

export function transitionAsPromise(triggeringFunc, el) {
    return new Promise((resolve) => {
        const handleTransitionEnd = () => {
            el.removeEventListener('transitionend', handleTransitionEnd)
            resolve()
        }
        el.addEventListener('transitionend', handleTransitionEnd)

        const classesBefore = el.getAttribute('class')
        const stylesBefore = el.getAttribute('style')

        triggeringFunc()

        if (
            classesBefore === el.getAttribute('class') &&
            stylesBefore === el.getAttribute('style')
        ) {
            handleTransitionEnd()
        }
    })
}

export function loadImage(src, image) {
    if ('decode' in image) {
        image.src = src
        return image.decode()
    } else {
        return new Promise(function(resolve, reject) {
            image.onload = resolve
            image.onerror = resolve
            image.src = src
        })
    }
}

export function fit(options) {
    let height
    let width

    const {
        imgHeight,
        imgWidth,
        containerHeight,
        containerWidth,
        containerGlobalWidth,
        containerGlobalHeight,
        imageSize,
    } = options

    const containerGlobalRatio = containerGlobalHeight / containerGlobalWidth
    const containerRatio = containerHeight / containerWidth
    const imgRatio = imgHeight / imgWidth

    if (imageSize == 'cover') {
        if (imgRatio < containerRatio) {
            height = containerHeight
            width = height / imgRatio
        } else {
            width = containerWidth
            height = width * imgRatio
        }
    } else if (imageSize == 'native') {
        height = imgHeight
        width = imgWidth
    } else {
        if (imgRatio > containerGlobalRatio) {
            height = containerGlobalHeight
            width = height / imgRatio
        } else {
            width = containerGlobalWidth
            height = width * imgRatio
        }
        if (imageSize === 'scale-down' && (width >= imgWidth || height >= imgHeight)) {
            width = imgWidth
            height = imgHeight
        }
    }

    return {
        height: height,
        width: width,
        top: (containerHeight - height) / 2,
        left: (containerWidth - width) / 2,
    }
}

export function openFullScreen(wrapper) {
    if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen()
        return true
    } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen()
        return true
    } else if (wrapper.msRequestFullscreen) {
        wrapper.msRequestFullscreen()
        return true
    } else {
        return false
    }
}

export function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
        return false
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
        return false
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
        return false
    } else {
        return true
    }
}
