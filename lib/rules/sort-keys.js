'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'require object keys to be sorted by key length and then sorted alphabetically',
            category: 'Stylistic Issues',
            recommended: true,
        },
        fixable: 'code',
        schema: [],
    },

    create: function(context) {
        return {
            ObjectExpression: function(node) {
                let group = {item: null, props: []};
                const groups = [group];
                for (const prop of node.properties) {
                    if (prop.type === 'Property') {
                        group.props.push(prop);
                    } else {
                        group = {item: prop, props: []};
                        groups.push(group);
                    }
                }
                let hasProblem = false;
                const sortedGroups = groups.map(({item, props}) => {
                    const sortedProps = props.slice().sort((a, b) => {
                        const aName = a.key.name || a.key.value;
                        const bName = b.key.name || b.key.value;
                        if (aName.length < bName.length) return -1;
                        if (aName.length > bName.length) return 1;
                        return aName < bName ? -1 : 1;
                    });
                    const haveDiff = sortedProps.some((item, index) => item !== props[index]);
                    if (haveDiff) {
                        hasProblem = true;
                    }
                    return {item, props: sortedProps};
                });
                if (hasProblem) {
                    context.report({
                        node,
                        message: 'Object properties is not sorted properly',
                        fix: fixer => {
                            const sourceCode = context.getSourceCode();
                            const newProps = [];
                            sortedGroups.forEach(({item, props}) => {
                                if (item) {
                                    newProps.push(sourceCode.getText(item));
                                }
                                newProps.push(...props.map(prop => sourceCode.getText(prop)));
                            });
                            return fixer.replaceText(node, '{' + newProps.join(', ') + '}');
                        },
                    });
                }
            },
        };
    },
};
