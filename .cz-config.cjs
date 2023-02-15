module.exports = {
  types: [
    { value: "feat", name: "✨feat:     新功能" },
    { value: "fix", name: "🐛fix:      修复" },
    { value: "docs", name: "✏️docs:     文档变更" },
    { value: "style", name: "💄style:    代码格式" },
    {
      value: "refactor",
      name: "♻️refactor: 重构"
    },
    { value: "perf", name: "⚡️perf:     性能优化" },
    { value: "test", name: "✅test:     增加测试" },
    { value: "chore", name: "🚀chore:    构建过程或辅助工具的变动" },
    { value: "revert", name: "⏪️revert:   回退" },
    { value: "build", name: "📦️build:    打包" },
    { value: "ci", name: "👷CI:   related changes" }
  ],
  // override the messages, defaults are as follows
  messages: {
    type: "请选择提交类型(必选):",
    customScope: "请输入修改范围(可选):",
    subject: "请简要描述提交(必填):",
    confirmCommit: "确认使用以上信息提交？(y/n/e/h)"
  },
  // used if allowCustomScopes is true
  allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ["body", "footer"]
}
