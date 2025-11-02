# SessionStart Hook: Operations Manager Identity

**Purpose:** This hook replaces the deprecated `output-styles` mechanism with a SessionStart hook that injects the Operations Manager identity at the beginning of every conversation.

## Migration from Output Styles (Nov 2024)

Claude Code is deprecating output styles on **November 5, 2025**. We've migrated the Operations Manager identity to use a SessionStart hook instead.

### What Changed

**Before (Output Styles):**
- Located at `.claude/output-styles/marketing-operations-manager.md`
- Modified system prompt directly
- Selected via `/output-style marketing-operations-manager`
- Configured in settings: `"outputStyle": "marketing-operations-manager"`

**After (SessionStart Hook):**
- **Script:** `.claude/hooks/SessionStart.sh` (contains the Operations Manager identity)
- **Configuration:** `.claude/settings.json` registers the hook
- **Behavior:** Injects context as user message at session start
- **Automatic:** Runs on every new conversation (startup, resume, clear, compact)

### How It Works

**Two-part setup required:**

1. **Hook script** (`.claude/hooks/SessionStart.sh`)
   - Executable bash script that outputs Operations Manager identity
   - stdout is added to conversation context

2. **Hook registration** (`.claude/settings.json`)
   ```json
   {
     "hooks": {
       "SessionStart": [
         {
           "hooks": [
             {
               "type": "command",
               "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/SessionStart.sh"
             }
           ]
         }
       ]
     }
   }
   ```

**Trigger matchers:**
- `startup` - New Claude Code session
- `resume` - Resuming conversation
- `clear` - After `/clear` command
- `compact` - After compact operation

### Testing the Hook

```bash
# Test the script manually (should output Operations Manager identity)
./.claude/hooks/SessionStart.sh

# Verify hook is registered
# Restart Claude Code and the identity should load automatically
```

### References

- [Claude Code Hooks Documentation](https://docs.claude.com/en/docs/claude-code/hooks)
- [Output Styles Deprecation Notice](https://docs.claude.com/en/docs/claude-code/output-styles)
- Original output style preserved at: `.claude/output-styles/marketing-operations-manager.md` (for reference only)
