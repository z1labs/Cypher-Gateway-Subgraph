import { BigInt } from "@graphprotocol/graph-ts";
import { EventDecryption as EventDecryptionEvent, ResultCallback as ResultCallbackEvent } from "../generated/Gateway/Gateway";
import { EventDecryption, ResultCallback } from "../generated/schema";

export function handleEventDecryption(event: EventDecryptionEvent): void {
  let entity = new EventDecryption(event.params.requestID.toString());
  
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.cts = event.params.cts.map<BigInt>((ct) => ct);
  entity.contractCaller = event.params.contractCaller;
  entity.callbackSelector = event.params.callbackSelector;
  entity.msgValue = event.params.msgValue;
  entity.maxTimestamp = event.params.maxTimestamp;
  entity.passSignaturesToCaller = event.params.passSignaturesToCaller;

  entity.save();
}

export function handleResultCallback(event: ResultCallbackEvent): void {
  let entity = new ResultCallback(event.transaction.hash.toHex() + "-" + event.logIndex.toString());

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.requestID = event.params.requestID;
  entity.success = event.params.success;
  entity.result = event.params.result;

  let eventDecryption = EventDecryption.load(event.params.requestID.toString());
  if (eventDecryption != null) {
    entity.eventDecryption = eventDecryption.id;
    eventDecryption.save();
  }

  entity.save();
}
