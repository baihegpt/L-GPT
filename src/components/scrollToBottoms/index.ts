"use client";

import addVersionToMetaTag from "./addVersionToMetaTag";

import AutoHideFollowButton from "./ScrollToBottom/AutoHideFollowButton";
import BasicScrollToBottom from "./BasicScrollToBottom";
import Composer from "./ScrollToBottom/Composer";
import FunctionContext from "./ScrollToBottom/FunctionContext";
import Panel from "./ScrollToBottom/Panel";
import StateContext from "./ScrollToBottom/StateContext";

import useAnimating from "./hooks/useAnimating";
import useAnimatingToEnd from "./hooks/useAnimatingToEnd";
import useAtBottom from "./hooks/useAtBottom";
import useAtEnd from "./hooks/useAtEnd";
import useAtStart from "./hooks/useAtStart";
import useAtTop from "./hooks/useAtTop";
import useMode from "./hooks/useMode";
import useObserveScrollPosition from "./hooks/useObserveScrollPosition";
import useScrollTo from "./hooks/useScrollTo";
import useScrollToBottom from "./hooks/useScrollToBottom";
import useScrollToEnd from "./hooks/useScrollToEnd";
import useScrollToStart from "./hooks/useScrollToStart";
import useScrollToTop from "./hooks/useScrollToTop";
import useSticky from "./hooks/useSticky";

export default BasicScrollToBottom;

export {
  AutoHideFollowButton,
  Composer,
  FunctionContext,
  Panel,
  StateContext,
  useAnimating,
  useAnimatingToEnd,
  useAtBottom,
  useAtEnd,
  useAtStart,
  useAtTop,
  useMode,
  useObserveScrollPosition,
  useScrollTo,
  useScrollToBottom,
  useScrollToEnd,
  useScrollToStart,
  useScrollToTop,
  useSticky,
};

addVersionToMetaTag();
