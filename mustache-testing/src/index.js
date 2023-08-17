import parseTemplateToTokens from './parseTemplateToTokens';
import templateRender from './templateRender'

window.renderTemplate = {
    render(templateStr, data) {
        // 将模板解析为tokens数组
        let tokens = parseTemplateToTokens(templateStr)
        // 将tokens数组与数据结合，解析成为最终的dom
        let domStr = templateRender(tokens, data)
        return domStr
    }
}
