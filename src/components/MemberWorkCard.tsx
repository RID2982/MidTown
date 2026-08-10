import React from 'react';
import type { Member } from '../data/members';
import { CardVisual } from './MemberCardVisual';

/**
 * Work-style member card wrapper, delegating rendering to the unified CardVisual
 * to ensure consistent, premium styling across all layout slots.
 */
export const MemberWorkCard: React.FC<{ member: Member }> = ({ member }) => (
  <CardVisual member={member} />
);
