/* eslint-disable no-undef */
const SYSTEM = __PLATFORM__;
const API_VERSION = __API_VERSION__;
const SYSTEM_NAME = __SYSTEM_NAME__;
const IS_MICRO = __IS_MICRO__;
const SERVER_PORT = __PORT__;

export { SERVER_PORT, SYSTEM, API_VERSION, SYSTEM_NAME, IS_MICRO };
export * from './system';
export * from '@libCommon/config';
