/* This file is part of https://github.com/SamyPesse/react-mathjax 
and and released under Apache License 2.0. */
import React from 'react'
import { PropTypes } from 'prop-types'

import process from './process'

/**
 * React component to render maths using mathjax
 * @type {ReactClass}
 */
class MathJaxNode extends React.Component {
    static propTypes = {
        inline:   PropTypes.bool,
        children: PropTypes.node.isRequired,
        onRender: PropTypes.func
    };

    static contextTypes = {
        MathJax: PropTypes.object
    };

    static defaultProps = {
        inline:   false,
        onRender: () => {}
    };

    /**
     * Render the math once the node is mounted
     */
    componentDidMount() {
        this.typeset();
    }

    /**
     * Prevent update when the tex has not changed
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextProps.children !== this.props.children
            || nextProps.inline !== this.props.inline
            || nextContext.MathJax !== this.context.MathJax
        );
    }

    /**
     * Update the jax, force update if the display mode changed
     */
    componentDidUpdate(prevProps) {
        const forceUpdate = prevProps.inline !== this.props.inline;
        this.typeset(forceUpdate);
    }

    /**
     * Clear the math when unmounting the node
     */
    componentWillUnmount() {
        this.clear();
    }

    /**
     * Create a script
     * @param  {String} text
     * @return {DOMNode} script
     */
    setScriptText = (text) => {
        const { inline } = this.props;

        if (!this.script) {
            this.script = document.createElement('script');
            this.script.type = 'math/mml; ' + (inline ? '' : 'mode=display');
            this.refs.node.appendChild(this.script);
        }

        if ('text' in this.script) {
            // IE8, etc
            this.script.text = text;
        } else {
            this.script.textContent = text;
        }

        return this.script;
    };

    /**
     * Update math in the node.
     * @param {Boolean} forceUpdate
     */
    typeset = (forceUpdate) => {
        const { MathJax } = this.context;
        const { children, onRender } = this.props;

        if (!MathJax) {
            return;
        }

        const text = children;

        if (forceUpdate) {
            this.clear();
        }

        if (!forceUpdate && this.script) {
            MathJax.Hub.Queue(() => {
                const jax = MathJax.Hub.getJaxFor(this.script);

                if (jax) jax.Text(text, onRender);
                else {
                    const script = this.setScriptText(text);
                    process(MathJax, script, onRender);
                }
            });


        } else {
            const script = this.setScriptText(text);
            process(MathJax, script, onRender);
        }
    };

    /**
     * Clear the jax
     */
    clear = () => {
        const { MathJax } = this.context;

        if (!this.script || !MathJax) {
            return;
        }

        const jax = MathJax.Hub.getJaxFor(this.script);
        if (jax) {
            jax.Remove();
        }
    };

    render() {
        return <span ref="node" />;
    }
}

export default MathJaxNode