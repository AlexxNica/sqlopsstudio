/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';
import * as sqlops from 'sqlops';
import { ConnectionManagementInfo } from 'sql/parts/connection/common/connectionManagementInfo';
import { ICapabilitiesService, clientCapabilities } from 'sql/services/capabilities/capabilitiesService';
import { ConnectionOptionSpecialType } from 'sql/workbench/api/common/sqlExtHostTypes';

import Event, { Emitter } from 'vs/base/common/event';
import { Action } from 'vs/base/common/actions';

export class CapabilitiesTestService implements ICapabilitiesService {

	public _serviceBrand: any;

	private _providers: sqlops.CapabilitiesProvider[] = [];

	public capabilities: { [id: string]: sqlops.DataProtocolServerCapabilities } = {};

	constructor() {

		let connectionProvider: sqlops.ConnectionProviderOptions = {
			options: [
				{
					name: 'serverName',
					displayName: undefined,
					description: undefined,
					groupName: undefined,
					categoryValues: undefined,
					defaultValue: undefined,
					isIdentity: true,
					isRequired: true,
					specialValueType: ConnectionOptionSpecialType.serverName,
					valueType: 0
				},
				{
					name: 'databaseName',
					displayName: undefined,
					description: undefined,
					groupName: undefined,
					categoryValues: undefined,
					defaultValue: undefined,
					isIdentity: true,
					isRequired: true,
					specialValueType: ConnectionOptionSpecialType.databaseName,
					valueType: 0
				},
				{
					name: 'userName',
					displayName: undefined,
					description: undefined,
					groupName: undefined,
					categoryValues: undefined,
					defaultValue: undefined,
					isIdentity: true,
					isRequired: true,
					specialValueType: ConnectionOptionSpecialType.userName,
					valueType: 0
				},
				{
					name: 'authenticationType',
					displayName: undefined,
					description: undefined,
					groupName: undefined,
					categoryValues: undefined,
					defaultValue: undefined,
					isIdentity: true,
					isRequired: true,
					specialValueType: ConnectionOptionSpecialType.authType,
					valueType: 0
				},
				{
					name: 'password',
					displayName: undefined,
					description: undefined,
					groupName: undefined,
					categoryValues: undefined,
					defaultValue: undefined,
					isIdentity: true,
					isRequired: true,
					specialValueType: ConnectionOptionSpecialType.password,
					valueType: 0
				}
			]
		};
		let msSQLCapabilities = {
			protocolVersion: '1',
			providerName: 'MSSQL',
			providerDisplayName: 'MSSQL',
			connectionProvider: connectionProvider,
			adminServicesProvider: undefined,
			features: undefined
		};
		this.capabilities['MSSQL'] = msSQLCapabilities;

	}

	/**
	 * Retrieve a list of registered server capabilities
	 */
	public getCapabilities(provider: string): sqlops.DataProtocolServerCapabilities {
		return this.capabilities[provider];
	}

	public get providers(): string[] {
		return Object.keys(this.capabilities);
	}

	/**
	 * Register the capabilities provider and query the provider for its capabilities
	 * @param provider
	 */
	public registerProvider(provider: sqlops.CapabilitiesProvider): void {
	}

	// Event Emitters
	public get onProviderRegisteredEvent(): Event<sqlops.DataProtocolServerCapabilities> {
		return undefined;
	}

	public isFeatureAvailable(featureName: Action, connectionManagementInfo: ConnectionManagementInfo): boolean {
		return true;
	}

	public onCapabilitiesReady(): Promise<void> {
		return Promise.resolve(null);
	}

	private _onCapabilitiesRegistered = new Emitter<string>();
	public readonly onCapabilitiesRegistered = this._onCapabilitiesRegistered.event;
}

