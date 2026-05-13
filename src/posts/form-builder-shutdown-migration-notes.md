---
title: "A popular form builder sets a shutdown deadline—migration notes for small teams"
description: "Exports, webhook consumers, and the hidden integrations that only show up when forms stop submitting."
type: news
date: 2026-05-05
author: alex-rivera
affiliate: false
---

When a form product shuts down, the visible problem is the form. The expensive problem is everything **downstream**: CRM leads, support tickets, billing workflows, and internal ops tools wired through webhooks and Zapier-style paths.

## Hidden issues we look for

- **Webhook retries** and idempotency—what happens when you replay traffic.
- **PII retention** policies in the replacement tool vs your old export.
- **Spam protection differences** that change lead volume overnight.

## What to do first

Inventory every form that touches money: checkout, quotes, onboarding, and cancellations.
