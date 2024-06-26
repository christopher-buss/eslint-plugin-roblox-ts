import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";
import { makeRule } from "../util/rules";

export const noExportAssignmentLetName = "no-export-assignment-let";
export const noExportAssignmentLet = makeRule<[], "noExportAssignmentLetViolation">({
	name: noExportAssignmentLetName,
	meta: {
		// TODO
		type: "problem",
		docs: {
			description: "Bans using `export =` on a let variable",
			recommended: "recommended",
			requiresTypeChecking: false,
		},
		messages: {
			noExportAssignmentLetViolation: "Cannot use `export =` on a `let` variable!",
		},
		schema: [],
	},
	defaultOptions: [],
	create(context) {
		const service = ESLintUtils.getParserServices(context);
		return {
			TSExportAssignment(node) {
				const tsNode = service.esTreeNodeToTSNodeMap.get(node);

				const expression = tsNode.expression;
				if (ts.isIdentifier(expression)) {
					const variable = context.sourceCode.getScope(node).variables.find(variable => {
						return variable.identifiers[0].name === expression.escapedText;
					});
					// Not sure why this works?
					if (variable?.defs[0].parent) {
						if (variable.defs[0].parent.type === AST_NODE_TYPES.VariableDeclaration) {
							if (variable.defs[0].parent.kind === "let") {
								context.report({
									node: node,
									messageId: "noExportAssignmentLetViolation",
								});
							}
						}
					}
				}
			},
		};
	},
});
