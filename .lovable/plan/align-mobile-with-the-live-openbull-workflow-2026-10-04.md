# Align Mobile With the Live Openbull Workflow

## Goal
Make mobile follow the same task sequence and action hierarchy as the live Openbull desktop app, while retaining the current compact two-tone styling.

## Workflow to Build

```text
Live dashboard
  → strategy monitor
    → All Strategies
      → View strategy
        → overview / positions / configuration
          → status-aware actions
```

- The Live tab will show the same strategy monitor pattern as desktop, with `EXIT` for active strategies and `VIEW` for inactive strategies.
- `All Strategies` will be a separate mobile list state reached from the monitor, not the default editing workspace.
- Tapping `VIEW` will open a read-only strategy detail first. Editing will be an explicit action from that detail.
- Each strategy will expose the desktop-equivalent lifecycle action: Exit when in position, Resume when paused, and Arm when idle.
- Secondary actions will move into a mobile action sheet: Edit/Configure, Analytics, Clone, Alerts, and Delete.
- Exit, Exit All, and Delete will require confirmation. Create will remain available from All Strategies and return to the detail view after saving.

## Corrections
- Add search and status filtering to All Strategies.
- Preserve status color meaning and P&L visibility from desktop.
- Fix leg saving so the configured leg count is retained instead of always saving four legs.
- Ensure Back returns to the preceding screen rather than resetting the entire Strategies tab.
- Keep the existing Settings, Notifications, Broker Accounts, Positions, and More flows unchanged.

## Verification
- Test the complete flow at Android width: Live → All Strategies → View → Edit → Save → Back.
- Test Arm, Resume, Exit, Clone, Delete, search, filters, and confirmation dialogs.
- Confirm the desktop preview remains unchanged and the app has no build or runtime errors.