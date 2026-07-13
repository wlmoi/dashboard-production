# Real-Time Monitoring SQP Dashboard

This repository is a React starter, so I cannot build a Microsoft Power Apps canvas app directly here. What I can provide is a build-ready specification that maps your requirements to a Power Apps solution you can implement in the Power Platform.

## 1. Solution Overview

Build a responsive Microsoft Power Apps canvas app with three modules:

1. Supply Dashboard
2. Quality Dashboard
3. Productivity Dashboard

Use a SharePoint-hosted Excel workbook as the primary data source, with Power Automate handling scheduled notifications and workflow alerts.

## 2. Recommended Data Model

Keep the Excel workbook normalized into separate tables. Store the workbook in SharePoint and define each range as an Excel table.

### Table: `tblSupplyKPI`
- `RecordID`
- `KPIType`
- `Title`
- `Description`
- `DateReported`
- `Owner`
- `Status`
- `Priority`
- `Value`
- `Target`

### Table: `tblQualityIssues`
- `RecordID`
- `IssueCategory`
- `IssueTitle`
- `Description`
- `DateReported`
- `ResponsibleOwner`
- `Priority`
- `CorrectiveActionPlan`
- `Status`
- `Completed`

### Table: `tblProductivityDaily`
- `RecordID`
- `Date`
- `FOLG_Output`
- `LP_Output`
- `HPC_Output`
- `MHP`
- `TargetOutput`

### Table: `tblTargets`
- `MetricName`
- `TargetValue`
- `Unit`
- `IsActive`

### Table: `tblYieldMetrics`
- `RecordID`
- `PeriodType`
- `DateOrMonth`
- `FOLG_Yield`
- `LP_Yield`
- `HPC_Yield`

## 3. App Structure

### Global Shell
- Left navigation rail with icons and labels for Supply, Quality, and Productivity.
- Top header with live date on the left and live time on the right.
- Blue enterprise theme with Fluent-style cards, soft gradients, and clear status colors.

### Header Requirements

Display date as `dd MMM yyyy` and time as `HH-mm-ss`.

Suggested Power Fx pattern:

```powerfx
Text(Now(), "dd mmm yyyy")
Text(Now(), "HH-mm-ss")
```

To keep both values live, refresh them with a timer control set to 1000 ms.

## 4. Screen Design

### Supply Dashboard
- KPI cards for Near Miss, Good Catch, and Incident tracking.
- Trend chart for each KPI.
- Status indicators showing Open, In Progress, and Closed counts.
- Filters for date range, owner, and priority.

### Quality Dashboard
- Form-based capture for `Material Under QE` and `Product Under QE`.
- Required fields:
  - Issue title
  - Description
  - Date reported
  - Responsible owner
  - Priority level
  - Corrective action plan
  - Status
  - Completion toggle
- Include a gallery of records with inline status chips.

### Productivity Dashboard
- Production Output MTD section.
- KPI tiles for FOLG, LP, and HPC with percentage progress or pie-style charts.
- MHP tracking card with target comparison.
- Daily Output Graph with a fixed red target line.
- MTD Yield and YTD Yield sections for FOLG, LP, and HPC.

## 5. Responsive Layout Guidance

- Desktop: three-column dashboard layout with cards and charts visible at once.
- Tablet: two-column layout with stacked chart sections.
- Mobile: single-column layout with collapsible navigation and vertically stacked cards.

Use containers with width breakpoints instead of hard-coded pixel positioning.

## 6. Power Fx Implementation Notes

### Real-Time Clock

Add a timer control named `tmrClock`:
- Duration: `1000`
- Repeat: `true`
- AutoStart: `true`
- OnTimerEnd:

```powerfx
Set(varCurrentDate, Text(Now(), "dd mmm yyyy"));
Set(varCurrentTime, Text(Now(), "HH-mm-ss"));
```

Bind the header labels to `varCurrentDate` and `varCurrentTime`.

### Configurable Targets

Load active targets from `tblTargets`:

```powerfx
LookUp(tblTargets, MetricName = "Daily Output", IsActive = true, TargetValue)
```

Use a settings screen or admin panel to update target values without changing formulas.

### Status Logic

```powerfx
If(ThisItem.Completed, "Completed", ThisItem.Status)
```

### Progress Calculation

```powerfx
If(TargetValue > 0, Round(Value / TargetValue * 100, 0), 0)
```

## 7. Power Automate Workflows

### Flow 1: Completion Email Notification
- Trigger: Recurrence every 10 minutes.
- Query completed records from the Excel tables.
- Send email to `william.anthony@alcon.com`.
- Include record type, title, completion date, owner, and status.
- Mark records as notified to prevent duplicates.

### Flow 2: Daily Teams Notification for MHP
- Trigger: Recurrence daily.
- Check whether MHP has met or exceeded the target.
- Post a Teams message to the designated channel.

### Flow 3: Daily Teams Notification for MTD Production Output
- Trigger: Recurrence daily.
- Compare total MTD output to the configured target.
- Post Teams alert if target is achieved.

## 8. SharePoint / Excel Integration Notes

- Store the Excel workbook in a SharePoint document library.
- Ensure each dataset is formatted as a named Excel table.
- Keep the workbook lightweight and avoid merged cells or formulas that Power Apps cannot delegate well.
- Prefer one row per record and avoid wide, semi-structured sheets.

## 9. Role-Based Access Readiness

Design for future roles now:
- Viewer: read-only dashboards.
- Editor: create and update records.
- Approver: review and close issues.
- Admin: manage targets and notifications.

Use a user-role lookup table or SharePoint list later if you want to expand beyond the initial app.

## 10. Recommended Delivery Sequence

1. Create the Excel tables and store them in SharePoint.
2. Build the canvas app shell with navigation and the live header.
3. Add each dashboard screen and bind data sources.
4. Add target management and validation logic.
5. Create the Power Automate notification flows.
6. Test on desktop, tablet, and mobile layouts.

## 11. Suggested Next Build Step

If you want, I can next turn this into a concrete Power Apps screen-by-screen build spec with exact controls, control names, gallery formulas, and flow steps.