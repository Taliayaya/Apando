import React from 'react'
import { PropTypes } from 'prop-types'
import Petal from './images/petal4.png'
var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i]
            descriptor.enumerable = descriptor.enumerable || false
            descriptor.configurable = true
            if ('value' in descriptor) descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps)
        if (staticProps) defineProperties(Constructor, staticProps)
        return Constructor
    }
})()

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        )
    }
    return call && (typeof call === 'object' || typeof call === 'function')
        ? call
        : self
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
            'Super expression must either be null or a function, not ' +
                typeof superClass
        )
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
        },
    })
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass)
}

var number = PropTypes.number

var CherryBlossom = (function (_React$Component) {
    _inherits(CherryBlossom, _React$Component)

    function CherryBlossom() {
        var _ref

        var _temp, _this, _ret

        _classCallCheck(this, CherryBlossom)

        for (
            var _len = arguments.length, args = Array(_len), _key = 0;
            _key < _len;
            _key++
        ) {
            args[_key] = arguments[_key]
        }

        return (
            (_ret =
                ((_temp =
                    ((_this = _possibleConstructorReturn(
                        this,
                        (_ref =
                            CherryBlossom.__proto__ ||
                            Object.getPrototypeOf(CherryBlossom)).call.apply(
                            _ref,
                            [this].concat(args)
                        )
                    )),
                    _this)),
                (_this.mounted = false),
                (_this.inited = false),
                (_this.context = null),
                (_this.petals = []),
                (_this.canvasWidth = 0),
                (_this.canvasHeight = 0),
                (_this.img = null),
                (_this.init = function () {
                    var props =
                        arguments.length > 0 && arguments[0] !== undefined
                            ? arguments[0]
                            : _this.props

                    _this.petals = []
                    for (var i = 0; i < props.amount; i++) {
                        _this.petals.push({
                            x: random(0, _this.canvasWidth),
                            y: random(0, _this.canvasHeight),
                            r: random(props.size, props.size * 2) / 2,
                            velX: 0,
                            velY: random(props.velocity, props.velocity * 2),
                            rolling: random(0, 2 * Math.PI),
                            opacity: 1,
                        })
                    }
                    if (!_this.inited) {
                        _this.inited = true
                        _this.generateObject()
                    }
                }),
                (_this.generateObject = function () {
                    if (!_this.mounted) return
                    if (!_this.context || !_this.context.clearRect)
                        _this.context = _this.refs.canvas.getContext('2d')
                    _this.context.clearRect(
                        0,
                        0,
                        _this.canvasWidth,
                        _this.canvasHeight
                    )

                    for (var i = 0; i < _this.petals.length; i++) {
                        var petal = _this.petals[i]
                        petal.velX =
                            Math.abs(petal.velX) <
                            Math.abs(_this.props.windforce)
                                ? petal.velX + _this.props.windforce / 20
                                : _this.props.windforce
                        petal.y = petal.y + petal.velY * 0.5
                        petal.x =
                            petal.x +
                            (_this.props.rolling
                                ? 0.4 *
                                  Math.cos((petal.rolling += 0.03)) *
                                  petal.opacity *
                                  _this.props.rolling
                                : 0) +
                            petal.velX * 0.5
                        // context . drawImage(image, dx, dy, dw, dh)
                        _this.context.drawImage(
                            _this.img,
                            petal.x - petal.r,
                            petal.y - petal.r,
                            2 * petal.r,
                            2 * petal.r
                        )

                        if (
                            petal.x > _this.canvasWidth + petal.r ||
                            petal.x < -petal.r ||
                            petal.y > _this.canvasHeight + petal.r ||
                            petal.y < -petal.r
                        ) {
                            _this.reset(petal)
                        }
                    }

                    if (_this.mounted) {
                        requestAnimationFrame(_this.generateObject)
                    }
                }),
                (_this.reset = function (petal) {
                    var prevR = petal.r
                    petal.r = random(_this.props.size, _this.props.size * 2) / 2
                    if (petal.x > _this.canvasWidth + prevR) {
                        petal.x = -petal.r
                        petal.y = random(0, _this.canvasHeight)
                    } else if (petal.x < -prevR) {
                        petal.x = _this.canvasWidth + petal.r
                        petal.y = random(0, _this.canvasHeight)
                    } else {
                        petal.x = random(0, _this.canvasWidth)
                        petal.y = -petal.r
                    }
                    petal.velX = 0
                    petal.velY = random(
                        _this.props.velocity,
                        _this.props.velocity * 2
                    )
                    petal.rolling = random(0, 2 * Math.PI)
                    petal.opacity = 1
                }),
                (_this.handleResize = function () {
                    if (!_this.inited) return
                    var H0 = _this.refs.canvas.height,
                        W0 = _this.refs.canvas.width,
                        H1 = _this.refs.canvas.offsetHeight,
                        W1 = _this.refs.canvas.offsetWidth

                    _this.refs.canvas.height = _this.canvasHeight = H1
                    _this.refs.canvas.width = _this.canvasWidth = W1
                    for (var i = 0; i < _this.petals.length; i++) {
                        var petal = _this.petals[i]
                        petal.x = (petal.x / W0) * W1
                        petal.y = (petal.y / H0) * H1
                    }
                }),
                _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    _createClass(CherryBlossom, [
        {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.mounted = true
                this.context = this.refs.canvas.getContext('2d')
                this.canvasHeight = this.refs.canvas.offsetHeight
                this.canvasWidth = this.refs.canvas.offsetWidth
                this.refs.canvas.height = this.canvasHeight
                this.refs.canvas.width = this.canvasWidth

                this.update()
            },
        },
        {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(props) {
                if (JSON.stringify(this.props) === JSON.stringify(props)) {
                    return
                }

                this.update(props)
            },
        },
        {
            key: 'update',
            value: function update() {
                var _this2 = this

                var props =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : this.props

                this.img = new Image()
                this.img.onload = function () {
                    return _this2.init(props)
                }
                this.img.className = 'petal'
                this.img.src = Petal

                window.addEventListener('resize', this.handleResize)
                window.setTimeout(this.handleResize, 250)
            },
        },
        {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.mounted = false
                window.removeEventListener('resize', this.handleResize)
            },
        },
        {
            key: 'render',
            value: function render() {
                var Style = {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zindex: this.props.zindex || 'auto',
                }

                return React.createElement('canvas', {
                    ref: 'canvas',
                    style: Style,
                })
            },
        },
    ])

    return CherryBlossom
})(React.Component)

CherryBlossom.propTypes = {
    amount: number,
    size: number,
    velocity: number,
    windforce: number,
    rolling: number,
    zindex: number,
}
CherryBlossom.defaultProps = {
    amount: 80,
    size: 12,
    velocity: 1.5,
    windforce: 2,
    rolling: 2,
    zindex: null,
}

function random(min, max) {
    var delta = max - min
    return max === min ? min : Math.random() * delta + min
}

export default CherryBlossom
